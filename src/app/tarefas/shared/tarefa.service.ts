import { Injectable } from '@angular/core';

import { Tarefa } from './';

@Injectable()
export class TarefaService {
  constructor() {}
  /*localStorage['tarefas'] é a chave que vai representar as tarefas no localStorage, 
    vai retornar os dados q estão atrelados a essa chave*/
  /*Linha 14: Se existe uma tarefa retorna uma lista de tarefas, senão retorna um array vazio. o json.parse vai 
      coverter string em obj json */
  listarTodos(): Tarefa[] {
    const tarefas = localStorage['tarefas']; // const cria uma constante
    return tarefas ? JSON.parse(tarefas) : [];
  }

  cadastrar(tarefa: Tarefa): void {
    const tarefas = this.listarTodos();
    tarefa.id = new Date().getTime(); /*Usa os segundos desde 1970 para criar a id da tarefa que vai ser adicionada */
    tarefas.push(tarefa); //add nova tarefa no final da lista de tarefas no localStorage
    localStorage['tarefas'] = JSON.stringify(
      tarefas
    ); /*Converte as tarefas que estão no formato json para string
    para ser salvas no localStoarage */
  }

  buscarPorId(id: number): Tarefa {
    const tarefas: Tarefa[] = this.listarTodos();
    return tarefas.find(
      (tarefa) => tarefa.id === id
    ); /*Método find da lista de tarefas. Itera por todas as tarefas
    que foram buscadas e compara os ids das tarefas do localStorage com o id que foi passado para o metodo */
  }

  atualizar(tarefa: Tarefa): void {
    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.forEach((obj, index, objs) => {
      /*No foreach o obj é a tarefa por qual ele está interando, ele tem as tarefas pq o objs é realmente as
       tarefas, aí ele atribui para obj, o index é a posição dessa tarefa no array */
      if (tarefa.id === obj.id) {
        objs[
          index
        ] = tarefa; /*Se a id da tarefa que foi passada para o metodo for igual a id da tarefa que ta na lista que foi buscada do localStorage
        entao substitua a tarefa que foi passada no lugar da tarefa que tá na lista */
      }
    });
    localStorage['tarefas'] = JSON.stringify(tarefas); // grava novamente a lista de tarefas no localStorage
  }

  /*no filter ele vai gerar uma nova lista de tarefas(por isso nao usou const e sim let)
   mas a tarefa da id que foi passada  n vai ta na lista. E depois ele vai gravar novamente a lista no localStorage*/
  remover(id: number): void {
    let tarefas: Tarefa[] = this.listarTodos();
    tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  /*Encontra o objeto que foi passado na id e muda o valor booleano desse objeto(esse concluida está no model
    de tarefas)se for true fica false e vice versa */
  alterarStatus(id: number): void {
    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.forEach((obj, index, objs) => {
      if (id === obj.id) {
        objs[index].concluida = !obj.concluida;
      }
    });
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }
}
