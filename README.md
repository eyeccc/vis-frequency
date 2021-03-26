# vis-frequency
plain js to visualize word frequency in a tsv file

input tsv should have the following format:

| id      | article        | selectedRange |
| ------- | -------------- | ------------- |
| 1       | this is a dog  | 1,5;2,8       |
| 2       | that is a cat  | 3,5;2,5;3,10  |
| 1       | this is a dog  | 1,4;2,6       |

selectedRange is in the following format:
`[start1],[end1];[start2],[end2]`
