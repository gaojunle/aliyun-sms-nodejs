# aliyun-sms-nodejs
阿里短信服务nodejs版本，支持发送短信服务，有业务级示例代码，简单方便，容易操作；
由于个人网站需要添加用户基于手机号的注册服务，而后台使用是nodejs实现，因此调研当前基于nodejs的短信服务，发现当前没有一个可用版本;

由于阿里短信服务注册就送20元代金券短信一条4.5分，很实惠，因此就基于它的API接口实现了nodejs版本发送短信示例，提供大家参考，如果喜欢，请加个Star;

### [不是阿里大于短信]

## 阿里云短信服务
> 短信服务（Short Message Service）是指通过调用短信发送API，将指定短信内容发送给指定手机用户。用户收到的短信来自106开头的号码，短信的内容多用于企业向用户传递验证码、系统通知、会员服务等信息。

参考文档：[阿里短信服务完整接入流程](https://help.aliyun.com/document_detail/55288.html?spm=5176.sms-account.109.10.MjVi25)

参考PHP版本及 [签名算法说明](https://help.aliyun.com/document_detail/54229.html?spm=5176.doc55288.6.575.va3KCh&parentId=44282) 另外，还参考github nodejs项目[aliyun-nodejs-sdk-smsV1](https://github.com/freecto/aliyun-nodejs-sdk-smsV1)实现；

## 使用说明：
1. 注册阿里账号，申请开通短信服务；
2. AccessKeyId及AccessKeySecret开通![image](https://p1.ssl.qhimg.com/t010a3cfac69deb2e7e.png)
3. 短信签名及短信模板申请，需要审核![image](https://p1.ssl.qhimg.com/t01b618da6590ff6187.png)
4. 将本项目sms.js中对应要替换内容，替换成你的，直接node sms.js即可以发短信到手机；

如有问题请直接github上发Issues