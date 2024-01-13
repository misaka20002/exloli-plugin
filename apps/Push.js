import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import simpleGit from 'simple-git';
import schedule from 'node-schedule';
import { pluginRoot } from '../model/path.js';
import Config from '../components/Config.js';
import Log from '../utils/logs.js';
import fetch from 'node-fetch';
import plugin from '../../../lib/plugins/plugin.js';

// 组合合并转发函数
async function mergeForward(picList) {
    let forwardMsg = [];
    let isSendBase64 = Config.getConfig().send_base64;

    for (let pic of picList) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        let message;
        if (isSendBase64) {
            let base64 = (await fetch(pic)).buffer().then(buffer => buffer.toString('base64'));
            message = segment.image(`base64://${base64}`);
        } else {
            message = segment.image(pic);
        }

        forwardMsg.push({
            user_id: Bot.uin,
            nickname: Bot.nickname,
            message: message
        });
    }

    return forwardMsg;
}

// 推送漫画函数
async function pushComics(comicDifferences, pushConfig) {
    const { user: userList, group: groupList } = pushConfig;
    comicDifferences.forEach(comic => {
        let comicMessage = createComicMessage(comic);

        // Push to users
        userList.forEach(async user => {
            try {
                await Bot.pickUser(user).sendMsg(["ExLOLI-PLUGIN 每日萝莉本子\n\n", segment.image(comic.cover), comicMessage]);
                if (Config.getConfig().push_pic) {
                    await Bot.pickUser(user).sendForwardMsg(await mergeForward(comic.pages_url));
                }
            } catch (error) {
                Log.e(error);
            }
        });

        // Push to groups
        groupList.forEach(async group => {
            try {
                await Bot.pickGroup(group).sendMsg(["ExLOLI-PLUGIN 每日萝莉本子\n\n", segment.image(comic.cover), comicMessage]);
                if (Config.getConfig().push_pic) {
                    await Bot.pickGroup(group).sendForwardMsg(await mergeForward(comic.pages_url));
                }
            } catch (error) {
                Log.e(error);
            }
        });
    });
}

// 创建漫画信息
function createComicMessage(comic) {
    let message = `\n${comic.title}\n\n`;
    Object.entries(comic.info).forEach(([key, values]) => {
        message += `${key}：${values.map(item => `#${item}`).join(' ')}\n`;
    });
    message += `页数：${comic.pages}\n上传时间：${comic.posted}\n原始地址：${comic.link}`;
    return message;
}

// 检查并更新漫画
async function checkAndUpdateComics() {
    const comicsPath = `${pluginRoot}/exlolicomic`;
    if (fs.existsSync(comicsPath) && fs.existsSync(path.join(comicsPath, 'db.lolicon.yaml'))) {
        let currentComicList = Config.getComicList();
        const git = simpleGit();
        try {
            const GITHUB_TOKEN = Config.getConfig().lolicon_token
            const GITHUB_USERNAME = 'erzaozi';
            await git.cwd(comicsPath).pull(`https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@mirror.ghproxy.com/https://github.com/erzaozi/exlolicomic.git`, 'main', { '--rebase': 'true' });
            let updatedComicList = Config.getComicList();
            let comicDifferences = _.differenceWith(updatedComicList, currentComicList, _.isEqual);

            if (comicDifferences.length > 0) {
                let pushConfig = Config.getConfig().push_list;
                await pushComics(comicDifferences, pushConfig);
                Log.i('有新的漫画，已推送：' + comicDifferences.map(comic => comic.title).join(', '));
            } else {
                Log.i('没有新的漫画，最新漫画更新时间：' + updatedComicList[0].posted);
            }
        } catch (error) {
            Log.e(error);
        }
    }
}

// 每10分钟检查一次
schedule.scheduleJob('*/1 * * * *', checkAndUpdateComics);

export class Push extends plugin {
    constructor() {
        super({
            name: 'ExLOLI-推送',
            dsc: 'ExLOLI 推送',
            event: 'message',
            priority: 1009,
            rule: [{
                reg: '^#?exloli推送$',
                fnc: 'push'
            }]
        });
    }

    async push(e) {
        if (!e.isMaster) {
            e.reply('臭萝莉控滚开啊！变态！！');
            return true;
        }
        let pushConfig = Config.getConfig().push_list;
        let currentComicList = Config.getComicList();
        let pushComic = currentComicList[0];
        await pushComics([pushComic], pushConfig);
        Log.i('已推送：' + pushComic.title);
    }
}
