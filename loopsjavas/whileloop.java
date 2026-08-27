import java.util.Scanner;

public class whileloop 
{
    public static void main(String []args) 
    {
        Scanner scanner = new Scanner(System.in);
        String response = "no"; // Value ng loop para mag go
        while (response.equalsIgnoreCase("no")) 
        {
            System.out.println("Here is a new offer! Do you accept? (yes/no):");
            response = scanner.nextLine(); ///
        }
        System.out.println("Offer accepted! Process completed.");
        scanner.close();
    }
}