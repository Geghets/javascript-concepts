// 2131. Longest Palindrome by Concatenating Two Letter Words
// You are given an array of strings words. Each element of words consists of two lowercase English letters.
//
// Create the longest possible palindrome by selecting some elements from words and concatenating them in any order.
// Each element can be selected at most once.
//
// Return the length of the longest palindrome that you can create. If it is impossible to create any palindrome, return 0.
//
// A palindrome is a string that reads the same forward and backward.

function longestPalindrome(words) {
    let wordCount = {};
    let length = 0;
    for (let i = 0; i < words.length; i++) {
        if (wordCount[words[i]]) {
            wordCount[words[i]].count += 1;
        } else {
            wordCount[words[i]] = { count: 1, isUsed: false };
        }
    }

    let isOddCount = false;

    Object.keys(wordCount).forEach((word) => {
        if (word[0] !== word[1]) {
            const reverse = word.split('').reverse().join('');
            if (wordCount[reverse] && !wordCount[reverse].isUsed) {
                if (wordCount[reverse].count > wordCount[word].count) {
                    length += wordCount[word].count * 4;
                } else {
                    length += wordCount[reverse].count * 4;
                }
                wordCount[reverse].isUsed = true
                wordCount[word].isUsed = true;
            }
        } else {
            if (wordCount[word].count % 2 === 0) {
                length += wordCount[word].count * 2;
            } else {
                isOddCount = true;
                length += (wordCount[word].count -1) *2;
            }
        }
    })

    if (isOddCount) {length += 2}
    return length;
}

let array = ["cc","ll","xx"];
console.log(longestPalindrome(array));
