#!/bin/bash


usageMessage () {
  echo "you must provide two arguments: "
  echo "  [First arg.]: the folder in which you want to initialize. It must be an epty or non existing folder."
  echo "  [second arg.]: the URI of your remote."
}



export REPERTOIRE_TRAVAIL=$1
export URI_DU_REPO=$2

if [ "x${REPERTOIRE_TRAVAIL}" = 'x-h' ]; then
  usageMessage
  exit 0
fi;

if [ "x${REPERTOIRE_TRAVAIL}" = 'x--help' ]; then
  usageMessage
  exit 0
fi;

if [ "x${REPERTOIRE_TRAVAIL}" = "x" ]; then
  usageMessage
  exit 1
fi;

if [ "x${URI_DU_REPO}" = "x" ]; then
  usageMessage
  exit 1
fi;

mkdir -p ${REPERTOIRE_TRAVAIL}

if [ "$(ls -A "${REPERTOIRE_TRAVAIL}")" ]; then
    echo "Error! ${REPERTOIRE_TRAVAIL} is not empty"
    usageMessage
    exit 2
else
    echo "Good, ${REPERTOIRE_TRAVAIL} is empty"
fi;

cd ${REPERTOIRE_TRAVAIL}

git init --initial-branch=master && touch README.md && git add -A && git commit -m "init git flow" && git flow init -d && git remote add origin ${URI_DU_REPO} && git flow feature start spinup && git push -u origin --all

