#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)

cd $SCRIPT_ROOT/..

API_DOC_OUTPUT_DIR=docs/api-docs
SRC_DIR=src/lib

if [[ -n $(git status --porcelain $SRC_DIR) ]]; then
    echo "Error: You have unstaged changes. Please commit or stash them before generating API docs."
    exit 1
fi

rm $(find $SRC_DIR -name '*.test.ts' -type f)

rm -rf $API_DOC_OUTPUT_DIR

npx typedoc \
    --exclude "**/*+(index|.test).ts" \
    --out $API_DOC_OUTPUT_DIR \
    --readme none \
    --name "Documents for @litert/config-loader" \
    --sourceLinkTemplate "https://github.com/litert/config-loader.js/blob/master/{path}#L{line}" \
    $SRC_DIR/Declaration.ts \
    $SRC_DIR/Constants.ts \
    $SRC_DIR/Loader.ts \
    $SRC_DIR/Errors.ts \
    $SRC_DIR/Encodings/*.ts \
    $SRC_DIR/Operators/*.ts \
    $SRC_DIR/Readers/*.ts

cd $API_DOC_OUTPUT_DIR/..

tar -zcf api-docs.tgz api-docs

rm -rf api-docs

cd $SCRIPT_ROOT/..

git checkout $SRC_DIR
