public class test{

    public static void main(String[] args){

    }

    public isLongPressed(String name, String typed){

        int offsetName = 0;
        int offsetLoop = 0;
        int nameLength= name.length()
        int counter = 0;

        while(counter < nameLength + offsetLoop){
            System.out.println(name.substring(offsetName, offsetLoop));
            System.out.println(name[counter+offsetName]);
            System.out.println(typed[counter]);
            System.out.println(offsetName);
            System.out.println(counter);

            if(name[counter+offsetName]==typed[counter-1]){

            }else if(typed[counter]==typed[counter-1]){
                offsetName -=1;
                offsetLoop  += 1;
            }else{
                if(nameLength+offsetLoop-counter==1 && typed.length()> nameLength+offsetLoop ){
                    offsetName -=1;
                offsetLoop  += 1;
                counter += 1
                }
            }
        }

    }
}
