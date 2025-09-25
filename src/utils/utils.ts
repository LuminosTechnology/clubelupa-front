export class TypeValidations{

  /**
   * Verifica se um array de números é nulo, indefinido ou vazio.
   * @param arr O array de números a ser verificado.
   * @returns Retorna true se o array for nulo, indefinido ou vazio, caso contrário, retorna false.
   */
  public static arrayNumberIsNullOrEmpty(arr: number[] | undefined | null): boolean {
    return arr == null || arr.length === 0 || arr == undefined;
  }  

  /**
   * Verifica se uma string é nula, indefinida ou vazia.
   * @param value A string a ser verificada.
   * @returns Retorna true se a string for nula, indefinida ou vazia (""), caso contrário, retorna false.
   */
  public static stringIsNullOrEmpty(value: string | undefined | null): boolean {
    return !value;
  }

    /**
   * Verifica se uma variável booleana é nula ou indefinida.
   * @param value A booleana a ser verificada.
   * @returns Retorna true se a booleana for nula ou indefinida, caso contrário, retorna false.
   */
  public static boolIsNull(value: boolean | undefined | null): boolean {
    return value === null || value === undefined;
  }

}