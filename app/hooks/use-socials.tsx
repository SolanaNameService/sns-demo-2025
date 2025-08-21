"use client"
import { getMultipleRecordsV2, getPrimaryDomain, Record as RecordV2,} from "@bonfida/spl-name-service"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"

type RecordValues = Partial<Record<RecordV2, string>>;

export const useSocials = () => {
    const {connection}= useConnection()
    const {publicKey}=useWallet()

    const [records, setRecords] = useState<RecordValues>({})
    const recordsToGet = [RecordV2.Twitter, RecordV2.Discord, RecordV2.Url]


    const fn = async ()=>{
        if(!publicKey) return
    const {reverse:primary} = await getPrimaryDomain(connection, publicKey)
    const recordResults = await getMultipleRecordsV2(connection, primary || "", recordsToGet, {deserialize:true})
    const mappedRecordValues = recordResults.reduce((prev, curr) => {
            if (curr) {
              return {
                ...prev,
                [curr.record]: curr.deserializedContent,
              };
            }
            return prev;
          }, {});

          setRecords(mappedRecordValues)
    }

    useEffect(()=>{
        fn()
    }, [connection, publicKey])
return records
}