module.exports = {
    // 运行时模式，用于支持在不同的部署规模下以最佳的方式运行,
    // 如：当服务器规模小可采用local模式（后端只需启动一个jvm进程轻巧方便）,
    // 当服务器规模足够大时可采用cluster模式（后端以分布式模式多个模块独立进程启动）
    // 建议：这个值最好是跨环境的，如：dev/fat/uat/pro等多个环境统一
    // 可选值：local|cluster
    RUNTIME_MODE: `"local"`, // 默认：local
}
