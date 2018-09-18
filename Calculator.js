function typePay() {
    typeCredit = document.getElementById("typeCredit").value;
    if(typeCredit == "1"){ 
        typeCredit = calculationAnn();
        }
    else{
        typeCredit = calculationDiff();
    }
 }

const RUB = ' руб';
const exceptions = {
   SUM_P: 'Вводите сумму',
   PERCENT_P: 'Вводите процентную ставку',
   SUM_A: 'Введенная сумма некорректна',
   PERCENT_A: "Введенная процентная ставка некорректна",
   TERM:'Введенный  срок кредита некорректен'
};

function calculationAnn() {
    var table = document.getElementById('tab');
       removeRows(table); // Очистка таблицы

    //Проверка на буквы и на пробелы:
       var sum = document.getElementById("sum").value;
      while(isNaN(sum) || ~sum.indexOf(' ')){
        sum = sum.replace(/ /g, '');
        if(isNaN(sum)) sum = prompt(exceptions.SUM_P,'');
           if(sum){
            document.getElementById("sum").value = sum; 
            }  
       } 

       var percent = document.getElementById("percent").value / 1200;
       while(isNaN(percent)){
           percent = prompt(exceptions.PERCENT_P,"") / 1200;
           document.getElementById("percent").value = percent * 1200;
       }
       
       //Проверка на наличие 0 и на отрицательный числа:
       if  (sum <= 0){
            alert(exceptions.SUM_A);
            return;
       }  
       if (percent <= 0){
          alert(exceptions.PERCENT_A);
           return;
       }
       var termYear = +document.getElementById("termYear").value ;
       var termMonth = +document.getElementById("termMonth").value;
       if (termYear <=0 && termMonth <= 0){ 
           alert(exceptions.TERM);
           return;
       }
           
       // Вычисления:
       var term = termYear * 12 + termMonth; 
       var coef = (percent * Math.pow(1 + percent,term)) / (Math.pow(1 + percent,term) - 1); 
       var standPay = sum * coef;              //ежемесечная  плата           
       var planPay = term * standPay;          // плановая
       var overPay = planPay - sum;            // переплата
      
       //Округление:
       var sp = standPay.toFixed(2) + RUB;
       var pp= planPay.toFixed(2) + RUB;
       var op = overPay.toFixed(2) + RUB;
        
        //Вывод:
        $(document).ready(function(){
                $('#planPay').html(pp);
                $('#overPay').html(op);
                $('#standPay').html(sp);
            });
}

function calculationDiff() {
       var table=document.getElementById('tab');
       removeRows(table); // Очистка таблицы
    
    //Проверка на буквы и на пробелы:
       var sum = document.getElementById("sum").value;
      while(isNaN(sum) || ~sum.indexOf(' ')){
        sum = sum.replace(/ /g, '');
        if(isNaN(sum)) sum = prompt(exceptions.SUM_P,'');
           if(sum){
            document.getElementById("sum").value = sum; 
            }  
       } 

       var percent = document.getElementById("percent").value;
       while(isNaN(percent)){
           percent = prompt(exceptions.PERCENT_P,"") / 1200;
           document.getElementById("percent").value = percent * 1200;
       }
       
       //Проверка на наличие 0 и на отрицательный числа:
       if  (sum <= 0){
            alert(exceptions.SUM_A);
            return;
       }

       if (percent <= 0){
          alert(exceptions.PERCENT_A);
           return;
       }

       var termYear = +document.getElementById("termYear").value*12 ;
       var termMonth = +document.getElementById("termMonth").value;
       if (termYear <= 0 && termMonth <= 0){ 
           alert(exceptions.TERM);
           return;
           }
           
           var arrPlan = [];
           var arrOver = [];
           var arrStand = [];
           var arrCreditPercent = [];
           var arrDebt = [];
           var arrRemainder = [];

           //Вычисления:
           var term = termMonth + termYear;
           var debt = sum/term; //сумма на которую погашается долг
           var Remainder = sum;
           var planPay = 0;
        
           for(i = 0;i<term;++i) {
           var creditPercent = (Remainder * percent * 31) / (36500);
           var standPay = debt + creditPercent; // ежемесячная выплата
           var Remainder = Remainder - debt;    // остаток
           planPay += standPay;                 // плановый платеж
           var overPay = planPay - sum;         //переплата
           
           //создание массивов выше перечисленных элементов:
           arrPlan[i] = planPay;
           arrCreditPercent[i] = creditPercent;
           arrStand[i] = standPay;
           arrDebt[i] = debt;
           arrRemainder[i] = Remainder;
           if(arrRemainder[i] < 0) arrRemainder[i] = 0;
           arrOver[i] = overPay;           
           }
           //Вывод и округление:

            //Вывод в строку 
            for(i = 0; i < term; i++){
                    var pp = arrPlan[i].toFixed(2) + RUB;
                    var op = arrOver[i].toFixed(2) + RUB;
                }
            $(document).ready(function(){
                $('#planPay').html(pp);
                $('#overPay').html(op);
                var spFirst = arrStand[0].toFixed(2) + RUB;
                var spLast = arrStand[term-1].toFixed(2) + RUB;
                $('#standPay').html(spFirst + '...' + spLast);
            })
        
            // Вывот в таблицу:
           $(document).ready(function () {
           for(i = 0; i < term; i++){
             var sp = arrStand[i].toFixed(2) + RUB;
             var cp = arrCreditPercent[i].toFixed(2) + RUB;
             var deb = arrDebt[i].toFixed(2) + RUB;
             var rem = arrRemainder[i].toFixed(2) + RUB;
             $('#tab').append('<tr id = "rows"> <td>' + (i + 1) + '</td>' +
                                              '<td>' + sp + '</td>' +
                                              '<td>' + cp + '</td>' +
                                              '<td>' + deb + '</td>' +
                                              '<td>' + rem + '</td>' + '</tr>');
            }
        });    
}

function removeRows(elem) {
$(document).ready(function () {
    $('tr#rows').remove();
});
}