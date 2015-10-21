package it.polito.nexa;

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.vocabulary.DCTerms;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;
import it.polito.nexa.triplifiers.DefaultJSONTriplifier;
import org.apache.jena.riot.RDFDataMgr;
import org.apache.jena.riot.RDFFormat;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

public class TriplesGenerator {

    public static void main(String[] args) throws IOException {
        if (args.length != 4) {
            System.err.println("Number of arguments is wrong!");
            System.exit(1);
        }

        String dataPath = args[0];
        String dataModel = args[1];
        String data = readFile(dataPath);
        String model = readFile(dataModel);
        String baseURI = args[2];
        String uriReference = args[3];

        Model baseModel = createBaseModel();
        DefaultJSONTriplifier djt = new DefaultJSONTriplifier(data, model, baseURI, uriReference);
        baseModel.add(djt.triplifyJSON());

        publishRDF("output/rdf.nt", baseModel);
    }

    private static String readFile(String source){
        String data = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(source));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line+"\n");
            }
            br.close();
            data = sb.toString();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
    }

    private static Model createBaseModel(){
        Model result = ModelFactory.createDefaultModel();
        Map<String, String> prefixMap = new HashMap<String, String>();

        prefixMap.put("rdfs", RDFS.getURI());
        prefixMap.put("geo", "http://www.w3.org/2003/01/geo/wgs84_pos#");
        prefixMap.put("schema", "http://schema.org/");
        prefixMap.put("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
        prefixMap.put("gn", "http://www.geonames.org/ontology#");
        prefixMap.put("rdf", RDF.getURI());
        prefixMap.put("dcterms", DCTerms.getURI());

        result.setNsPrefixes(prefixMap);

        return result;
    }

    private static void publishRDF(String filePath, Model model) throws FileNotFoundException {
        File file = new File(filePath.replaceAll("(.+)/[^/]+", "$1"));
        file.mkdirs();
        OutputStream outTurtle = new FileOutputStream(new File(filePath));
        RDFDataMgr.write(outTurtle, model, RDFFormat.NTRIPLES);
        System.out.println("RDF printed!");
    }
}
