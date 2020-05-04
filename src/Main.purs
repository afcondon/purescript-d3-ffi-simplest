module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import Effect.Uncurried (EffectFn1, runEffectFn1)

foreign import initDOMJS :: EffectFn1 String Unit
foreign import updateJS  :: EffectFn1 Unit Unit

main :: Effect Unit
main = do
  runEffectFn1 initDOMJS "#hook"
  -- | to run updates with D3.transitions you will have to do these calls asynchronously
  -- | this is not an issue for simple charts
  -- runEffectFn1 updateJS unit
  -- runEffectFn1 updateJS unit
  -- runEffectFn1 updateJS unit
  log "🍝"
