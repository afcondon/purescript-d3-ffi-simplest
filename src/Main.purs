module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import Effect.Uncurried (EffectFn1, runEffectFn1)

type ChartObj = { name :: String, value :: Number }
type ChartData = Array ChartObj

chartData :: ChartData
chartData = [
    { name: "E", value: 0.12702 }
  , { name: "T", value: 0.09056 }
  , { name: "A", value: 0.08167 }
  , { name: "O", value: 0.07507 }
  , { name: "I", value: 0.06966 }
  , { name: "N", value: 0.06749 }
  , { name: "S", value: 0.06327 }
  , { name: "H", value: 0.06094 }
  , { name: "R", value: 0.05987 }
  , { name: "D", value: 0.04253 }
  , { name: "L", value: 0.04025 }
  , { name: "C", value: 0.02782 }
  , { name: "U", value: 0.02758 }
  , { name: "M", value: 0.02406 }
  , { name: "W", value: 0.0236 }
  , { name: "F", value: 0.02288 }
  , { name: "G", value: 0.02015 }
  , { name: "Y", value: 0.01974 }
  , { name: "P", value: 0.01929 }
  , { name: "B", value: 0.01492 }
  , { name: "V", value: 0.00978 }
  , { name: "K", value: 0.00772 }
  , { name: "J", value: 0.00153 }
  , { name: "X", value: 0.0015 }
  , { name: "Q", value: 0.00095 }
  , { name: "Z", value: 0.00074 }
]

foreign import initChart :: EffectFn1 String Unit
foreign import drawChart  :: EffectFn1 ChartData Unit

foreign import initGUP :: EffectFn1 String Unit
foreign import updateGUP  :: EffectFn1 Unit Unit

main :: Effect Unit
main = do
  runEffectFn1 initChart "#chart"
  runEffectFn1 drawChart chartData

  runEffectFn1 initGUP "#GUP"
  -- | to run updates with D3.transitions you will have to do these calls asynchronously
  -- | this is not an issue for simple charts
  -- runEffectFn1 updateGUP unit
  -- runEffectFn1 updateGUP unit
  -- runEffectFn1 updateGUP unit
  log "🍝"
