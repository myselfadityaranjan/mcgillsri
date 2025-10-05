export const DEFAULT_EASE = [0.22, 0.61, 0.36, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: DEFAULT_EASE,
    },
  },
}

export const fadeIn = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: DEFAULT_EASE,
    },
  },
}

export const staggerChildren = (stagger = 0.12, delayChildren = 0.08) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

export const floatIn = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: DEFAULT_EASE,
    },
  },
}

export type MotionVariant = typeof fadeUp | typeof fadeIn | ReturnType<typeof staggerChildren>

