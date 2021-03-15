
1.
```sh
eval `ssh-agent -s`
ssh-add ~/.ssh/gitlab_ed25519
```
2. ssh to server
3.
```sh
sudo --preserve-env=SSH_AUTH_SOCK sh
cd /docker/build/blockscout/blockscout
git pull origin master
```
4. 
```sh
cd /docker
docker-compose up -d --build blockscout
```