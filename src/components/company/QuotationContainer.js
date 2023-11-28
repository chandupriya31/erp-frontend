import { useDispatch, useSelector } from "react-redux"
import { startSetQuotation } from "../../actions/quotation-action"
import { QuotationList } from "./QuotationList"
import { useEffect } from "react"
export function QuotationContainer() {
   const dispatch = useDispatch()

   const quotationList = useSelector((state) => {
      return state.quotation.List
   })
   //console.log(quotataionList,'q-c-list')
   useEffect(() => {
      dispatch(startSetQuotation())
   }, [])

   return (
      <div>
         <QuotationList quotationList={quotationList} />
      </div>
   )
}