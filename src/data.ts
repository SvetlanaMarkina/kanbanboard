import { data } from './type';

function storageInitial() {
  !localStorage.getItem('data') &&
    localStorage.setItem(
      'data',
      `{
      "backlog": [],
      "ready": [],
      "progress": [],
      "finished": []
      }`
    )
}

function getData(): data {
  const data: string | null = localStorage.getItem('data')
  const result: data = data ? JSON.parse(data) : {}
  return result
}

function setData(data: data) {
  const jsonData = JSON.stringify(data)
  localStorage.setItem('data', jsonData)
}

function dataCounter(): number {
  let counter: number = 0
  const curData: any = getData()

  for (let key in curData) {
    if (key !== 'finished') {
      counter += +curData[key].length
    }
  }
  return counter
}

function finishedCounter(): number {
  let counter: number = 0
  const curData: data = getData()
  counter += +curData['finished'].length
  return counter
}

function createId(): number {
  let id: number = 0
  const curData: data = getData()

  for (let key in curData) {
    id += +curData[key].length
  }
  return id
}

export { storageInitial, getData, setData, dataCounter, finishedCounter, createId }