import { useState } from "react";
const useFetchData = <T>() => {
    const [data, setData] = useState<T | undefined>();
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [isLoad, setIsLoad] = useState<boolean>(false)

    const getData = (url: string, apiMethod: string) => {

            (async () => {
                    setIsLoad(true);
                    fetch(url, {method: apiMethod})
                    .then(response => response.json())
                    .then(data => {
                        setData(data);
                        setIsLoad(false);
                    })
                    .catch((error)=> setErrorMsg(error.message))
                    .finally(()=>setIsLoad(false))
                }
            )();
    }
    return { data, errorMsg , isLoad, getData};
};

export default useFetchData;