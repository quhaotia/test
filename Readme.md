﻿# test
# test
程序主要由react、solidity和javascript编写。其中solidity编译器版本为0.8.9.
使用方法：
1、打开ipfs监听和ganache链接私网（我的ipfs为桌面客户端，只需要打开不需要输入命令）
2、在程序目录打开控制台，输入npm start即可使用。
（从github上下载的版本需要通过npm下载相关依赖包）
由于时间原因，程序可能存在一些bug，提示error后一般只需要刷新即可正常运行。
程序主要功能的实现方式都是依赖于图片的hash值。
程序拍卖功能每次只能进行一件商品的拍卖，在时间结束后需要竞拍最高价者领取后才能进行第二次拍卖。拍卖时间以秒为单位。
使用截图：
主界面：
![image](https://user-images.githubusercontent.com/91251905/140592859-683b8180-0d45-4b6d-9575-74f635259a15.png)
其中第一个按钮为开发时测试用，没有实际意义。
各个按钮会在点击后显示结果或者额外的输入和按钮，再次点击收回按钮和输入。例如铸造：
![image](https://user-images.githubusercontent.com/91251905/140593073-7c79b519-49df-4ab9-a68c-084cef0c1947.png)
点击后出现上传文件的输入，上传后根据结果判断是否铸币成功。查询由哪些NFT时会直接弹出对话框，给出NFT的hash值
