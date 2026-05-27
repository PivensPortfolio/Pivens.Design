import { getVariant } from '../../utils/cookies'
import HeroA from './HeroA'
import HeroB from './HeroB'
import HeroC from './HeroC'

const variants = { A: HeroA, B: HeroB, C: HeroC }

export default function Hero() {
  const variant = getVariant()
  const Component = variants[variant] ?? HeroA
  return <Component />
}
