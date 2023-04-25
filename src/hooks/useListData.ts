import { hideLoading, Infinite, showLoading } from "@/utils"
import { stopPullDownRefresh, usePullDownRefresh, useReachBottom } from "@tarojs/taro"
import { useRef, useState, useEffect } from "react"
import useMemoizedFn from "./useMemoizedFn"

type useListDataResType<P, R> = {
  getNext: () => Promise<void>;
  getPre: () => Promise<void>;
  refreshList: () => Promise<void>;
  setParams: (params: Partial<P>) => void;
  listData: R[];
  setListData: React.Dispatch<R[]>;
  changeRowData: (index: number, row: Partial<R>) => void;
  loading: boolean;
}

/**
 * 分页列表的管理
 * @param request 获取数据的请求
 * @param initParms 初始化参数
 * @param useLoadingState 是不是要使用loading的state，如果设置为true就会有响应式的loading
 * @param hideLoadingToast 隐藏加载的toast
 * @returns 
 */
const useListData = <P, R>(
  request: (p: P) => Promise<R[]>,
  initParms?: Partial<P>,
  options?: {
    useLoadingState?: boolean,
    hideLoadingToast?: boolean,
    refreshHandle?: (res: useListDataResType<P, R> & {infinite: Infinite<P, R>}) => (() => void) | undefined
    reachBottomHandle?: (res: useListDataResType<P, R> & {infinite: Infinite<P, R>}) => (() => void) | undefined
  }
) => {
  const [listData, setListData] = useState<R[]>([])
  const [loading, setLoading] = useState(false)

  const { useLoadingState, hideLoadingToast, refreshHandle, reachBottomHandle } = options || {}
  const { current: infinite } = useRef(new Infinite(initParms || {}, async (params: P) => {
    const res = await request(params)
    return {
      list: res
    }
  }, (sig) => {
    if (useLoadingState) {
      setLoading(sig)
    }
    if (!hideLoadingToast) {
      if (sig) {
        showLoading({ title: '加载中' })
      } else {
        hideLoading()
      }
    }
  }))
  // const { next, pre, refresh, setParams } = infinite

  /**
   * 记载下一页
   */
  const getNext = useMemoizedFn(async () => {
    const res = await infinite.next()
    setListData([...listData, ...(res.list || [])])
  })

  /**
   * 获取上一页
   */
  const getPre = useMemoizedFn(async () => {
    const res = await infinite.pre()
    setListData([...(res.list || []), ...listData])
  })

  /**
   * 刷新列表
   */
  const refreshList = useMemoizedFn(async () => {
    const res = await infinite.refresh()
    stopPullDownRefresh()
    setListData([...(res.list || [])])
  })

  /**
   * 改变某一行的数据
   */
  const changeRowData = useMemoizedFn((index: number, row: Partial<R>) => {
    const newList = [...listData]
    newList[index] = { ...newList[index], ...row }
    setListData(newList)
  })

  useEffect(() => {
    refreshList()
  }, [refreshList])

  let res: useListDataResType<P, R> = {
    getNext,
    getPre,
    refreshList,
    setParams: useMemoizedFn(infinite.setParams.bind(infinite)),
    listData,
    setListData,
    changeRowData,
    loading
  }

  usePullDownRefresh(refreshHandle?.({...res, infinite}) || refreshList)
  useReachBottom(reachBottomHandle?.({...res, infinite}) || getNext)

  return res
}

export default useListData