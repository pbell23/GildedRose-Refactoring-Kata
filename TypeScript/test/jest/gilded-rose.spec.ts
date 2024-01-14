import { GildedRose, Item } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  describe('Common Item', () => {
    it('should never have negative quality', () => {
      const gildedRose = new GildedRose([new Item('Common Item', 20, 0)])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0)
    })

    it('should degrade quality twice as fast once expiration date has passed', () => {
      const gildedRose = new GildedRose([new Item('Common Item', 0, 6)])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(4)
    })
  })

  describe('Aged Brie', () => {
    it('should increase quality and decrease sell in', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 20, 4)])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(5)
      expect(items[0].sellIn).toBe(19)
    })
    it('should never increase quality higher than 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 20, 50)])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50)
    })
    it('should increase quality two times faster if sell in as passed', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 4)])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(6)
      expect(items[0].sellIn).toBe(-1)
    })
  })

  describe('Sulfuras, Hand of Ragnaros', () => {
    it('should never degrade or lose quality', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 20, 4)])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(4)
      expect(items[0].sellIn).toBe(20)
    })
  })

  describe('Backstage passes', () => {
    it('should increase quality twice as fast when sell in below 10 days', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 9, 4)])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(6)
    })

    it('should increase quality by 3 when sell in below 5 days', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 4)])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(7)
    })

    it('should fall quality to 0 when sell in has passed', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 4)])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0)
    })
  })
});
