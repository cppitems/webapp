
## serve local

```bash
ng serve
ng serve --host 0.0.0.0 --disable-host-check # access via http://localhostORdomain:4200/#
```

## deploy
```bash
ng build --prod --base-href "/" # use this for cppitems.github.io
```

# polyfills
```bash
npm install -D babel-loader @babel/core @babel/preset-env  # https://github.com/babel/babel-loader
npm install --save-dev babel-plugin-transform-es2015-arrow-functions
npm install --save-dev babel-plugin-transform-es2015-template-literals
npm install --save-dev @babel/core @babel/cli
```

```bash
for file in ./dist/cppitems/*.js ; do \
    echo $file; \
    ./node_modules/.bin/babel "$file" --out-file "${file}.babel" --presets @babel/preset-env
    cp "${file}.babel" "$file"; \
    rm "${file}.babel"; \
done;
```