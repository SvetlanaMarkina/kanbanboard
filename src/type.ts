interface task {
    id: number,
    title: string,
    description: string
}
  
interface data {
    [mode: string]: task[],
    backlog: task[],
    ready: task[],
    progress: task[],
    finished: task[]
}
  
export { data, task }