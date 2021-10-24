import { useSelector } from "react-redux";

const useData = <S>(cb: (s: GlobalState) => S) => {
  return useSelector<GlobalState, S>(cb)
}

export default useData;