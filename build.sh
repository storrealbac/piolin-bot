echo "Building project"
rm -rf ./dist
tsc
cp -ar ./src/processor ./dist/
echo "Project built on $(date)"