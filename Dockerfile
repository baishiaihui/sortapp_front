# FROM node:14.4.0-alpine 使用不可
FROM node:16.13.1-alpine

ARG WORKDIR

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \

WORKDIR ${HOME}