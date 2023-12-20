export const formatTrophyCaseData = (data: any) => {
  const cards = data?.cards?.targetItems?.map((item: any) => {
    return {
      title: item?.title?.value,
      imageSrc: item?.imageSrc?.src,
      toolTipText: item?.toolTipText?.value,
    }
  })
  const newData = {
    title: data?.title?.value,
    cards,
    legal: data?.legal?.value,
    backgroundColor: data?.backgroundColor?.targetItem?.color?.value,
    paginationColor: data?.paginationColor?.targetItem?.color?.value,
    titleColor: data?.titleColor?.targetItem?.color?.value,
    legalTextColor: data?.legalTextColor?.targetItem?.color?.value,
    titleTagName: data?.titleTagName?.value,
    titleStyleName: data?.titleStyleName?.value,
    cardBackgroundColor: data?.cardBackgroundColor?.targetItem?.color?.value,
    cardTitleColor: data?.cardTitleColor?.targetItem?.color?.value,
    cardTitleTagName: data?.cardTitleTagName?.value,
    cardTitleStyleName: data?.cardTitleStyleName?.value,
    cardTitleFontName: data?.cardTitleFontName?.value,
  }
  return newData
}

export const formatAwardCarouselData = (data: any) => {
  const cards = data?.cards?.targetItems?.map((item: any) => {
    return {
      title: item?.title?.value,
      imageSrc: item?.imageSrc?.src,
      subTitle: item?.subTitle?.value,
      legal: item?.legal?.value,
    }
  })
  const newData = {
    cards,
    backgroundColor: data?.backgroundColor?.targetItem?.color?.value,
    paginationColor: data?.paginationColor?.targetItem?.color?.value,

    cardTitleTagName: data?.cardTitleTagName?.value,
    cardTitleStyleName: data?.cardTitleStyleName?.value,
    cardTitleColor: data?.cardTitleColor?.targetItem?.color?.value,

    cardSubTitleTagName: data?.cardSubTitleTagName?.value,
    cardSubTitleStyleName: data?.cardSubTitleStyleName?.value,
    cardSubTitleColor: data?.cardSubTitleColor?.targetItem?.color?.value,

    cardLegalTextColor: data?.cardLegalTextColor?.targetItem?.color?.value,
  }
  return newData
}
