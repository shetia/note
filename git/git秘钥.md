<!--
 * @Author: shetia
 * @Date: 2020-04-26 11:19:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-26 11:20:12
 * @Description: file content
 -->
报的错误：
```
Cloning into 'kxvc'...
remote: HTTP Basic: Access denied
fatal: Authentication failed for 'http://192.168.xxx.xx/kxvc/kxvc.git/'
```


执行 
```
git config --system --unset credential.helper
```



在开发中我们经常需要通过 git 对代码进行拉取和提交，频繁地输入用户名和密码会带来很大的麻烦，下面就介绍一下解决git每次拉取、提交代码时都需要输入用户名和密码的方法。

　　很简单，只要两步骤就能实现：

　　1.在~/.gitconfig目录下多出一个文件，用来记录你的密码和帐号
```
         git config --global credential.helper store     
```   

　　2.再最后输入一次正确的用户名和密码，就可以成功的记录下来，这是最后一次麻烦啦！
1
```
git pull
```



//查看是否存在ssh文件
$ cd ~/.ssh
#如果.ssh文件夹不存在，可以执行指令自行创建
$ mkdir ~/.ssh
//删除本地电脑上的已经存在的ssh key方法
在MAC电脑左上角点击“前往”，在弹出的输入框中输入"~/.ssh",然后点击前往，即可进入本地电脑的ssh文件目录，删除存在的ssh key,只需要将目录下的id_rsa、id_rsa.pub删除，其中的know_hosts文件，有时需要删除，有时不需要，这个具体操作时可以尝试就可以了
 
//生成 RSA 密钥对
```
$ ssh-keygen -t rsa -C "你的注册邮箱@xxx.com"
```
# 为了方便，全程回车即可（这个过程中会出现诸如key pair，passphrase等的请求，一律回车即可）
