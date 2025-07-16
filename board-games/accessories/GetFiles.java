
import java.io.File;
import java.io.PrintWriter;

public class GetFiles {

    public static void main(String[] args) {
        try {
            // Path of the directory
            String directoryPath = "./images";

            // Creating a File object for the specified directory
            File directory = new File(directoryPath);

            // Get all files in the direcotry
            File[] files = directory.listFiles();

            // Output file
            PrintWriter writer = new PrintWriter("image-files.js");
            writer.print("let imageFileArr = [");

            // Check if the directory is valid and not empty
            if (files != null) {
                // Iterate through the array and print the names
                for (int i = 0; i < files.length; i++) {
                    //System.out.println(files[i].getName());
                    writer.print("'" + files[i].getName() + "'");

                    if (i < files.length - 1) {
                        writer.print(",");
                    }
                }

                writer.print("]");
            }
			
			writer.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
