package dw.movieDic.Service;

import dw.movieDic.Exception.ResourceNotFoundException;
import dw.movieDic.Model.Purchase;
import dw.movieDic.Model.User;
import dw.movieDic.Repository.PurchaseRepository;
import dw.movieDic.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PurchaseService {
    @Autowired
    PurchaseRepository purchaseRepository;
    @Autowired
    UserRepository userRepository;
    
    public Purchase savePurchase(Purchase purchase){
        // 구매확정 바로 직전, 현재시간을 저장함
        purchase.setPurchaseTime(LocalDateTime.now());
        return purchaseRepository.save(purchase);
    }

    public List<Purchase> savePurchaseList(List<Purchase> purchaseList){
        List<Purchase> savedPurchaseList = purchaseList.stream()
                .map((purchase) -> {
                    // 구매확정 바로 직전, 현재시간을 저장함
                    purchase.setPurchaseTime(LocalDateTime.now());
                    return purchaseRepository.save(purchase);
                })
                .collect(Collectors.toList());
        return savedPurchaseList;
    }

    public List<Purchase> getAllPurchases(){
        return purchaseRepository.findAll();
    }
public List<Purchase> getPurchaseListByUser(String userId){
    // 유저아이디로 유저객체 찾기
    Optional<User> userOptional = userRepository.findByUserId(userId);
    if(userOptional.isEmpty()){
        throw new ResourceNotFoundException("User", "ID", "userId");
    }
    return purchaseRepository.findByUser(userOptional.get());
}
public List<Purchase> getPurchaseListByCurrentUser(){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if(authentication == null || !authentication.isAuthenticated()){
        throw new IllegalStateException("User is not authenticated!");
    }
    String userId = authentication.getName();
    Optional<User> userOptional = userRepository.findByUserId(userId);
    if(userOptional.isEmpty()){
        throw  new ResourceNotFoundException("User", "ID", "userId");
    }
return purchaseRepository.findByUser(userOptional.get());
}
}
