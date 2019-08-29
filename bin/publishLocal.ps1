# Publishing to local consumers

$targets = @(
  "../unifyre-native-components/node_modules/unifyre-react-helper/"
)

function CopyNodeModules () {
  param($path)
  echo "copy to $path"
  Copy-Item './dist' -Destination $path -Force -Recurse
}

$targets | ForEach-Object {CopyNodeModules $_}


