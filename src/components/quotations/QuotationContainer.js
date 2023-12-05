import { useDispatch, useSelector } from "react-redux"
import { startSetQuotation } from "../../actions/quotation-action"
import { QuotationList } from "./QuotationList"
import { useEffect } from "react"
export default function QuotationContainer() {
   const dispatch = useDispatch()

   const quotationList = useSelector((state) => {
      return state?.quotation?.list
   })
   console.log(quotationList,'q-c-list')
   useEffect(() => {
      dispatch(startSetQuotation())
   }, [])

   return (
      <div>
         <QuotationList quotationList={quotationList} />
      </div>
   )
}