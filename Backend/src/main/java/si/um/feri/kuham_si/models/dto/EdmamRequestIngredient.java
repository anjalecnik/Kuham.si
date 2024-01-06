package si.um.feri.kuham_si.models.dto;

public class EdmamRequestIngredient {

    private int quantity;
    private String measure;
    private String food;
    private double weight;

    private double ENERC_KCAL;
    private double FAT;
    private double CHOCDF;
    private double PROCNT;

    @Override
    public String toString() {
        return "weight=" + weight +
                ", ENERC_KCAL_quantity=" + ENERC_KCAL +
                ", FAT_quantity=" + FAT +
                ", CHOCDF_quantity=" + CHOCDF +
                ", PROCNT_quantity=" + PROCNT;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getMeasure() {
        return measure;
    }

    public void setMeasure(String measure) {
        this.measure = measure;
    }

    public String getFood() {
        return food;
    }

    public void setFood(String food) {
        this.food = food;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getENERC_KCAL() {
        return ENERC_KCAL;
    }

    public void setENERC_KCAL(double ENERC_KCAL) {
        this.ENERC_KCAL = ENERC_KCAL;
    }

    public double getFAT() {
        return FAT;
    }

    public void setFAT(double FAT) {
        this.FAT = FAT;
    }

    public double getCHOCDF() {
        return CHOCDF;
    }

    public void setCHOCDF(double CHOCDF) {
        this.CHOCDF = CHOCDF;
    }

    public double getPROCNT() {
        return PROCNT;
    }

    public void setPROCNT(double PROCNT) {
        this.PROCNT = PROCNT;
    }
}

