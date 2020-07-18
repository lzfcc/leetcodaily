const fs = require('fs')
const path = require('path')

const pwd = '/Users/mac/Documents/简历/leetcodaily/Leetcode'//process.cwd()
const files = fs.readdirSync(pwd)
files.forEach(function (filename) {
    const fullname = path.join(pwd, filename)
    var stats = fs.statSync(fullname);
    if (stats.isDirectory()) {
        const files = fs.readdirSync(fullname)
        console.log(files)
        files.forEach(function (swiftFile) {
            if (swiftFile.endsWith('.swift')) {
                const oldPath = path.join(fullname, swiftFile)
                const [ id ] = filename.match(/\d+/)
                const newPath = path.join(pwd, `${id}.swift`)
                console.log(oldPath, newPath)
                // fs.renameSync(oldPath, newPath) 
            }
        })
        console.log(fullname)
        fs.unlinkSync(fullname)  
    }
})
