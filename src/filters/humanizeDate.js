import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

export default (date) => {
  return distanceInWordsToNow(date, { addSuffix: true })
}
