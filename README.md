# middleware

# 使用wasm文件
# emcc main.c -Os -s WASM=1 -s SIDE_MODULE=1 -o math.wasm    // 把math.c 文件编译成wasm文件 再引用
# 在控制台能看见    console.log('math', response.instance.exports.add(1, 2))    // 3
