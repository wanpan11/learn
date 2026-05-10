let isMount = true // 申明一个全局变量，用来区分 mount 和 update
let workInProgressHook = null // 申明一个全局变量，作为链表的指针

const fiber = {
  stateNode: App, // stateNode 用来保存当前组件
  memoizedState: null, // 用来保存当前组件内部的状态
}

function useState(initialState) {
  let hook

  if (isMount) {
    hook = {
      memoizedState: initialState,
      next: null,
      queue: {
        pending: null,
      },
    }
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook
    }
    else {
      workInProgressHook.next = hook
    }
    workInProgressHook = hook
  }
  else {
    hook = workInProgressHook
    workInProgressHook = workInProgressHook.next
  }

  let baseState = hook.memoizedState
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next
    do {
      const action = firstUpdate.action
      baseState = action(baseState)
      firstUpdate = firstUpdate.next
    } while (firstUpdate !== hook.queue.pending.next)
    hook.queue.pending = null // 循环结束，清空链表
  }

  hook.memoizedState = baseState
  return [baseState, dispatchAction.bind(null, hook.queue)]
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  }

  if (queue.pending === null) {
    update.next = update
  }
  else {
    update.next = queue.pending.next
    queue.pending.next = update
  }

  queue.pending = update

  setTimeout(() => {
    schedule()
  }, 1000)
}

function schedule() {
  workInProgressHook = fiber.memoizedState // 让指针指向当前的useState保存的值
  const app = fiber.stateNode() // 执行组件的渲染函数，将结果保存在app里
  isMount = false // 首次渲染之后，isMount 变成 false
  return app // 将fiber.stateNode的结果返回
}

function App() {
  const [num, setNum] = useState(0)
  const [num_1] = useState('1')
  const [num_2] = useState('2')

  return {
    onClick() {
      setNum(n => n + 1)
      setNum(n => n + 2)
      setNum(n => n + 3)
      setNum(n => n + 4)
    },
  }
}

schedule().onClick()
