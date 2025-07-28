export type CacheEntry<T> = {
  createdAt: number,
  val: T,
}

export class Cache {
  constructor(interval: number) {
    this.#interval = interval
    this.#startReapLoop() // start the reap loop
    this.#cache
  }
  #cache = new Map<String, CacheEntry<any>>()
  #reapIntervalId: NodeJS.Timeout | undefined = undefined
  #interval: number
  // add to cache
  add<T>(string: String, val: T) {
    // new cache entry
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val
    }
    // add new cache entry to cache map
    this.#cache.set(string, entry)
  }
  // get from cache
  get<T>(key: String): T | undefined {
    return this.#cache.get(key)?.val
  }
  // cleanup
  #reap() {
    // loop through the cache
    for (let [key, entry] of this.#cache) {
      // remove any entries that are expired
      if (Date.now() - entry.createdAt > this.#interval) {
        // delete entry
        this.#cache.delete(key)
      }
    }
  }
  // cleanup every interval
  #startReapLoop() {
    // use arrow function to preserve 'this' context
    this.#reapIntervalId = setInterval(() => {this.#reap()}, this.#interval)
  }
  // allow external reap loops to stop
  stopReapLoop() {
    clearInterval(this.#reapIntervalId)
    this.#reapIntervalId = undefined
  }
}
