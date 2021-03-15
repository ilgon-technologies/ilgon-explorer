
1.
```sh
eval `ssh-agent -s`
ssh-add ~/.ssh/gitlab_ed25519
```
2. ssh to server
3.
```sh
cd /docker/build/blockscout/blockscout
sudo --preserve-env=SSH_AUTH_SOCK git pull origin master
```
4. 
```sh
cd /docker
sudo docker-compose up -d --build blockscout
```