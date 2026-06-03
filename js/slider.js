class Slider {
  constructor({
    wrapper, // HTML элемент
    slides, // коллекция HTML элементов
    nextBtn, // HTML элемент
    prevBtn, // HTML элемент
    initSlideIdx = 0,
    itemsAmount = 1,
    onShownSlideChange = undefined,
  }) {
    this.arrSlides = slides
    this.totalSlides = this.arrSlides.length
    if (!this.totalSlides) {
      return Error('Не верно переданы слайды')
    }
    this.slideWidth = this.arrSlides[0].offsetWidth // ожидается, что все слайды одной ширины
    this.wrapper = wrapper
    this.shownSlideIdx = initSlideIdx
    this.itemsAmount = itemsAmount
    this.onShownSlideChange = onShownSlideChange

    this.manageBtnsDisabling(nextBtn, prevBtn)
    this.createListeners(nextBtn, prevBtn)
    this.toSlide(this.shownSlideIdx)
  }

  createListeners (nextBtn, prevBtn) {
    nextBtn.addEventListener('click', () => {
      if (this.shownSlideIdx < this.totalSlides - this.itemsAmount + 1) {
        this.shownSlideIdx++
        this.toSlide(this.shownSlideIdx)
      }

      this.manageBtnsDisabling(nextBtn, prevBtn)
    })

    prevBtn.addEventListener('click', () => {
      if (this.shownSlideIdx > 0) {
        this.shownSlideIdx--
        this.toSlide(this.shownSlideIdx)
      }
      this.manageBtnsDisabling(nextBtn, prevBtn)
    })
  }

  manageBtnsDisabling (nextBtn, prevBtn) {
    nextBtn.disabled = this.shownSlideIdx === this.totalSlides - this.itemsAmount;
    prevBtn.disabled = this.shownSlideIdx === 0
  }

  toSlide (idx) {
    if (this.onShownSlideChange) {
      this.onShownSlideChange(idx)
    }

    this.wrapper.style.transform = `translateX(-${idx * this.slideWidth}px)`
  }
}
