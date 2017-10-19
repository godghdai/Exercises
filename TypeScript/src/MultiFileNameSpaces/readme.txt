Once there are multiple files involved, we¡¯ll need to make sure all of the compiled code gets loaded. There are two ways of doing this.

First, we can use concatenated output using the --outFile flag to compile all of the input files into a single JavaScript output file:

tsc --outFile sample.js Test.ts
The compiler will automatically order the output file based on the reference tags present in the files. You can also specify each file individually:

tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts