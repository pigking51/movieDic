package dw.memorial.Controller;

import dw.memorial.Model.Purchase;
import dw.memorial.Service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PurchaseController {
    @Autowired
    PurchaseService purchaseService;

    @PostMapping("/products/purchase")
    public Purchase savePurchase(@RequestBody Purchase purchase){
        return purchaseService.savePurchase(purchase);
    }

    @PostMapping("/products/purchaseList")
    @PreAuthorize("hasAnyRole('ADMIN,USER')")
    public List<Purchase> savePurchaseList(@RequestBody List<Purchase> purchaseList){
        return purchaseService.savePurchaseList(purchaseList);
    }

    @GetMapping("/products/purchase")
    @PreAuthorize("hasAnyRole('ADMIN,USER')")
    public List<Purchase> getAllPurchases(){
        return purchaseService.getAllPurchases();
    }

    @PreAuthorize("hasAnyRole('ADMIN,USER')")
    @GetMapping("/products/purchase/{userId}")
    public ResponseEntity<List<Purchase>> getPurchaseListByUserName(
            @PathVariable String userName){
    return new ResponseEntity<>(purchaseService.getPurchaseListByUser(userName),
            HttpStatus.OK);
    }

    @GetMapping("/products/purchase/current")
    public List<Purchase> getPurchaseListByCurrentUser(){
        return purchaseService.getPurchaseListByCurrentUser();
    }
}
