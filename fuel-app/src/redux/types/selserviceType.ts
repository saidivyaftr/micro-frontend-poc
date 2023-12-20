export type featureType = {
  image: { src: string }
  icon: { rendered: string }
  title: { value: string }
  description: { value: string }
  text: { value: string }
  list?: {
    list: Array<{ description: { value: string } }>
    targetItems: Array<{ text: { value: string } }>
  }
}

export type productFeatures = Array<featureType>

export type productDetails = {
  title: { value: string }
  price: { value: string }
  description: { value: string }
  featurelist?: { list: productFeatures }
}

export type SecureProductsType = {
  title: {
    value: string
  }
  description: {
    value: string
  }
  Image: {
    src: string
  }
  icon: {
    rendered: string
  }
  featurelist: { list: Array<{ description: { value: string } }> }
}
