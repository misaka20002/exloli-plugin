![exloli-plugin](https://socialify.git.ci/misaka20002/exloli-plugin/image?description=1&font=Raleway&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Auto)

# ExLOLI-PLUGIN 🍑

<img decoding="async" align=right src="resources/readme/girl.png" width="35%">

- 一个基于 [Yunzai 系列机器人框架](https://github.com/yhArcadia/Yunzai-Bot-plugins-index) 的 E 站本子推送插件，从 E 站里站实时同步更新并下载漫画并上传发送到任何地方

- 可自定义推送内容，标签，支持搜索功能，表站无需配置 COOKIE，里站需要配置 E 站 COOKIE

- **使用中遇到问题请加 QQ 群咨询：[707331865](https://qm.qq.com/q/TXTIS9KhO2)**

> [!TIP]
> 考虑到开发团队账号风险，该项目是该账号下首发的开源项目，由于第一版采用前后端分离结构，后端采用的图床被狠狠制裁了（悲），现如今考虑到一些用户有自定义搜索内容的需求，故将爬取逻辑重构，并发布了第二代版本，插件为 [CikeyQi](https://github.com/CikeyQi) 与作者共同开发，当前已实现推送和搜索功能，非常建议您搭配 imgS-plugin 的 E 站搜图食用哦~

## 安装插件

> [!CAUTION]
> 欢迎使用 ExLOLI-PLUGIN，在您开始使用之前，请仔细阅读以下重要信息：
>
> - 年龄限制：本插件仅供年满 18 岁（或您所在国家/地区的法定成年年龄）的用户使用。使用本软件即表示您确认自己符合这一年龄要求。
> - 遵守当地法律：用户必须遵守自己所在国家或地区的所有法律和规定。请注意，在某些国家和地区（例如中国），使用或访问本插件中的内容可能是非法的。用户有责任确保自己的行为符合当地法律。
> - 免责声明：本插件的开发者不对用户如何使用本软件承担任何法律责任。用户需对使用本插件可能产生的任何法律后果负责。
> - 确认同意：在使用本插件之前，请确认您已阅读、理解并同意遵守以上所有条款。
> - 隐私和安全：本插件尊重并保护所有用户的隐私和安全。有关数据收集和处理的详细信息，请参阅我们的隐私政策。
>   谢谢您选择使用 ExLOLI-PLUGIN。我们希望您安全、负责任地享受我们的产品。
> - 如果您已仔细阅读并同意以上安全使用规范，并已知晓可能产生的后果，请对机器人发送 `我已阅读并同意插件使用须知`

#### 1. 克隆仓库

```
git clone https://github.com/misaka20002/exloli-plugin.git ./plugins/exloli-plugin
```

> [!NOTE]
> 如果你的网络环境较差，无法连接到 Github，可以使用 [GitHub Proxy](https://mirror.ghproxy.com/) 提供的文件代理加速下载服务
>
> ```
> git clone https://mirror.ghproxy.com/https://github.com/misaka20002/exloli-plugin.git ./plugins/exloli-plugin
> ```

#### 2. 安装依赖

```
pnpm install --filter=exloli-plugin
```

## 插件配置

<details> <summary>如何获取Cookie</summary>

- 本插件功能是不符合中国大陆规定的，我们非常不建议你在国内平台使用，你可以使用 [TRSS-Yunzai](https://github.com/TimeRainStarSky/Yunzai) 将其使用在 `Discord` 等国外平台

- 登录 [表站](https://forums.e-hentai.org/)，第一行中如果出现 **Welcome Guest ( Log In | Register )**，说明你还未登录，如果已有账号则选择 **Log In**, 如还未注册则选择**Register**
- 登录成功后打开控制台输入

```javascript
copy(document.cookie)
console.log('Cookie已复制到剪切板')
```

- 在 cookie 中找到需要的字段，使用锅巴插件后台登录填写

</details>

## 功能列表

请使用 `#exloli帮助` 获取完整帮助

- [x] 实时推送更新
- [x] 自定义自动推送漫画标签
- [x] 自定义自动推送搜索内容
- [x] 搜索历史漫画
- [x] 推送历史漫画
- [x] 漫画本地存储

## 常见问题

1. 为什么我使用推送命令后没有收到推送？
   - 发送推送仅推送至所有开启了推送配置的群以及私聊。
   - 日志中会即刻显示推送完成，本子内容将陆续推送至指定群聊。
2. 为什么我配置过了推送，之前能推送现在不能？
   - 在更换了机器人账号后需要再次配置。
3. 账号配置是否应该全部填写
   - 表站无需配置 cookie,漫画可自由查看，里站必填 ipb_member_id、ipb_pass_hash、sk、igneous
4. 为什么我的账号没有 igneous（igneous 如何获取）
   - 当你使用原生 ip 注册表站后，等待半个月将自动获得里站资格，当登录里站时将会看到 igneous，如果仍未获得可能是 ip 有问题，~~（图省事的话你可以考虑买一个账号）~~。

## 支持与贡献

如果你喜欢这个项目，请不妨点个 Star🌟，这是对开发者最大的动力， 当然，你可以对我 [爱发电](https://afdian.net/a/sumoqi) 赞助，呜咪~❤️

有意见或者建议也欢迎提交 [Issues](https://github.com/misaka20002/exloli-plugin/issues) 和 [Pull requests](https://github.com/misaka20002/exloli-plugin/pulls)。

## 许可证

本项目使用 [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) 作为开源许可证。
