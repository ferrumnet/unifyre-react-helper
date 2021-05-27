#!/bin/bash
## declare an array variable

declare -a arr=(
  "../unifyre-native-wallet-components/node_modules/unifyre-native-components/"
)

## now loop through the above array
for path in "${arr[@]}"
do
  echo "copy to $path"
  cp -rf './src' $path
done