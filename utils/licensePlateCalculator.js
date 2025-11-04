const fs = require('node:fs')
const path = require('node:path')
const { parse } = require('csv-parse/sync')
const { stringify } = require('csv-stringify/sync')

/**
 * 处理车牌数据 - 累计小时数按入场时间去重，出现次数不去重
 * @param {Array} data - 原始数据数组
 * @returns {Array} 统计结果
 */
function processLicenseData(data) {
  const resultMap = new Map()
  const processedEntryTimes = new Set()

  data.forEach((row) => {
    const license = row['车牌']
    const entryTime = row['入场时间']
    const receiveTime = row['领取时间']

    if (!license || !entryTime || !receiveTime)
      return

    // 计算小时差
    const entry = new Date(entryTime)
    const receive = new Date(receiveTime)
    const hoursDiff = Math.ceil((receive - entry) / (1000 * 60 * 60))

    // 更新出现次数（不去重）
    if (!resultMap.has(license)) {
      resultMap.set(license, { count: 0, hours: 0 })
    }
    const record = resultMap.get(license)
    record.count += 1

    // 累计小时数（按入场时间去重）
    const entryKey = `${license}_${entryTime}`
    if (!processedEntryTimes.has(entryKey)) {
      record.hours += hoursDiff
      processedEntryTimes.add(entryKey)
    }
  })

  // 转换为数组并排序
  return Array.from(resultMap.entries())
    .map(([license, data]) => ({
      车牌: license,
      出现次数: data.count,
      累计小时数: Number.parseFloat(data.hours.toFixed(2)),
    }))
    .sort((a, b) => b.出现次数 - a.出现次数)
}

/**
 * 从CSV文件处理数据
 * @param {string} filePath - 文件路径
 * @returns {Array} 处理结果
 */
function processFromCSV(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const records = parse(fileContent, { columns: true, skip_empty_lines: true })
    console.log(`读取 ${records.length} 条记录`)
    return processLicenseData(records)
  }
  catch (error) {
    console.error('处理失败:', error.message)
    return []
  }
}

/**
 * 保存结果为CSV
 * @param {Array} data - 结果数据
 * @param {string} outputPath - 输出路径
 */
function saveToCSV(data, outputPath) {
  const csvString = stringify(data, { header: true })
  fs.writeFileSync(outputPath, `\uFEFF${csvString}`, 'utf8')
  console.log(`结果已保存: ${outputPath}`)
}

// 使用示例
const result = processFromCSV(path.join(__dirname, 'car_list.csv'), true)
saveToCSV(result, path.join(__dirname, 'car_list_result.csv'))

// console.log('[ result ] ===>', result)
