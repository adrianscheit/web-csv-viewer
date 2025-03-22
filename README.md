# WEB CSV Viewer
https://adrianscheit.github.io/web-csv-viewer/

## Goal: 
Simple Web application, a viewer of ASCII/UTF-8 endocded CSV files, containing numerical data, where the first column is the domain. 
Normally an calc-sheet is enough to do it, but for bigger files (over 10MB) it is not able to deal with the data, and this tool has no problems with 100MB files and supposedly even bigger.

### Local development
```sh
git config --global user.name ""
git config --global user.email ""
ssh-keygen -t ed25519
cat ~/.ssh/id_ecdsa.pub # copy to GitHub
```
