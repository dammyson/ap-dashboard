import { alphabets } from "@/utils/contants"


export const useGetColorByChar = () => {
    const colors = ['#410002', '#bbcae6', '#23539f', '#BD3826', '#F09436']

    const charsArr: string[] = []

    for (let i = 0; i < alphabets.length; i = i + colors.length) {
        charsArr.push(alphabets.slice(i, i + colors.length).join(''))
    }

    function getColor(char?: string | number) {
        if (char === undefined || !char) return '#989898'

        if (typeof char === 'number') {
            return colors[char] ?? colors[char % colors.length]!
        }

        return (
            colors[
                charsArr[
                    Math.floor(
                        alphabets.indexOf(char.toUpperCase()) / colors.length
                    )
                ]?.indexOf(char.toUpperCase()) ?? 0
            ] ?? ''
        )
    }

    return {
        getColor,
        getInitials(firstName: string, lastName: string, email?: string) {
            return !!firstName || !email
                ? `${firstName?.charAt(0)}${lastName?.charAt(0)}`
                : email?.charAt(0)
        },
    }
}

export type GetColorByChar = ReturnType<typeof useGetColorByChar>['getColor']
