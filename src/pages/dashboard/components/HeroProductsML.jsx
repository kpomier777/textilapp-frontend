/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useSelector } from "react-redux"
import HeroProductsPreview from "./HeroProductsPreview"
import HeroProductsBar from "./HeroProductsBar"
import HeroProductsBarver from "./HeroProductsBarver"
import { TextSubTitle, DotAnimation, Contentml } from "./styles"
import TextilService from "@/services/textil-service"
import { ENTITY_ML } from "@/config/entities"
import { isNotAuthorized } from "@/helpers/check-status"

export default function HeroProductsML() {
  const { token } = useSelector((state) => state.userAuth)
  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_ML)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    TextilService.getML(
      (response) => {
        const { data: rawResponse } = response
        if (rawResponse.status) {
          console.log(rawResponse.data.mlb.c)
          setData(rawResponse.data)
          setLoading(false)
        } else {
          setData(null)
          setLoading(false)
        }
      },
      (error) => {
        const { status = 0 } = error.request
        if (isNotAuthorized(status)) {
          navigate("/logout")
        }
        toast.error(error.message)
      },
      () => {
        setLoading(false)
      }
    )
  }, [])
  return (
    <div className="w-[95%] h-[95%] py-8 px-8 shadow-lg bg-black/30 rounded-3xl">
      {loading ? (
        <TextSubTitle $color="#FFF">
          Cargando
          <DotAnimation $delay="500ms">.</DotAnimation>
          <DotAnimation $delay="600ms">.</DotAnimation>
          <DotAnimation $delay="700ms">.</DotAnimation>
        </TextSubTitle>
      ) : (
        data && (
          <Contentml>
            <HeroProductsPreview data={data.ml} />
            <HeroProductsBar data={data.mla} />  
            <div className="w-[95%] h-[95%] pb-8 mt-10">
              <h1 className="font-dmSans font-bold text-3xl">
                Estimacion de usabilidad (por turno)
              </h1>
              <HeroProductsBarver key="1" data={data.mlb.a} name="Devanado"/> 
              <HeroProductsBarver key="2" data={data.mlb.b} name="Ovillado"/> 
              <HeroProductsBarver key="3" data={data.mlb.c} name="Tintoreria"/> 
            </div>
          </Contentml>
        )
      )}
    </div>
  )
}
